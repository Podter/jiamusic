import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { getOctokit } from '@actions/github';

import { uploadAssets } from './upload-release-assets';
import { getAssetName } from './utils';

import type { Artifact, TargetInfo } from './types';

type Platform = {
  signature: string;
  url: string;
};

type VersionContent = {
  version: string;
  notes: string;
  pub_date: string;
  platforms: {
    [key: string]: Platform;
  };
};

export async function uploadVersionJSON({
  owner,
  repo,
  version,
  notes,
  tagName,
  releaseId,
  artifacts,
  targetInfo,
  updaterJsonPreferNsis,
  updaterJsonKeepUniversal,
}: {
  owner: string;
  repo: string;
  version: string;
  notes: string;
  tagName: string;
  releaseId: number;
  artifacts: Artifact[];
  targetInfo: TargetInfo;
  updaterJsonPreferNsis: boolean;
  updaterJsonKeepUniversal: boolean;
}) {
  if (process.env.GITHUB_TOKEN === undefined) {
    throw new Error('GITHUB_TOKEN is required');
  }

  const github = getOctokit(process.env.GITHUB_TOKEN);

  const versionFilename = 'latest.json';
  const versionFile = resolve(process.cwd(), versionFilename);
  const versionContent: VersionContent = {
    version,
    notes,
    pub_date: new Date().toISOString(),
    platforms: {},
  };

  const assets = await github.rest.repos.listReleaseAssets({
    owner: owner,
    repo: repo,
    release_id: releaseId,
    per_page: 50,
  });
  const asset = assets.data.find((e) => e.name === versionFilename);

  if (asset) {
    const assetData = (
      await github.request(
        'GET /repos/{owner}/{repo}/releases/assets/{asset_id}',
        {
          owner: owner,
          repo: repo,
          asset_id: asset.id,
          headers: {
            accept: 'application/octet-stream',
          },
        }
      )
    ).data as unknown as ArrayBuffer;

    versionContent.platforms = JSON.parse(
      Buffer.from(assetData).toString()
    ).platforms;
  }

  let sigFile = artifacts.find((s) =>
    s.path.endsWith(updaterJsonPreferNsis ? '.nsis.zip.sig' : 'msi.zip.sig')
  );

  if (!sigFile) {
    sigFile = artifacts.find((s) => s.path.endsWith('.sig'));
  }

  const assetNames = new Set(
    artifacts.map(
      (p) => getAssetName(p.path).trim().replace(/ /g, '.') // GitHub replaces spaces in asset names with dots
    )
  );
  let downloadUrl;
  {
    const filteredAssets = assets.data.filter((e) => assetNames.has(e.name));
    const filtAsset = filteredAssets.find((s) =>
      s.name.endsWith(updaterJsonPreferNsis ? '.nsis.zip' : '.msi.zip')
    );
    if (filtAsset) {
      downloadUrl = filtAsset.browser_download_url;
    } else {
      downloadUrl = filteredAssets.find(
        (s) => s.name.endsWith('.tar.gz') || s.name.endsWith('.zip')
      )?.browser_download_url;
    }
  }

  // Untagged release downloads won't work after the release was published
  downloadUrl = downloadUrl?.replace(
    /\/download\/(untagged-[^/]+)\//,
    tagName ? `/download/${tagName}/` : '/latest/download/'
  );

  let os = targetInfo.platform as string;
  if (os === 'macos') {
    os = 'darwin';
  }

  if (downloadUrl && sigFile) {
    let arch = sigFile.arch;
    arch =
      arch === 'amd64' || arch === 'x86_64' || arch === 'x64'
        ? 'x86_64'
        : arch === 'x86' || arch === 'i386'
        ? 'i686'
        : arch === 'arm'
        ? 'armv7'
        : arch === 'arm64'
        ? 'aarch64'
        : arch;

    // Expected targets: https://github.com/tauri-apps/tauri/blob/fd125f76d768099dc3d4b2d4114349ffc31ffac9/core/tauri/src/updater/core.rs#L856
    if (os === 'darwin' && arch === 'universal') {
      // Don't overwrite native builds
      if (!versionContent.platforms['darwin-aarch64']) {
        (versionContent.platforms['darwin-aarch64'] as unknown) = {
          signature: readFileSync(sigFile.path).toString(),
          url: downloadUrl,
        };
      }
      if (!versionContent.platforms['darwin-x86_64']) {
        (versionContent.platforms['darwin-x86_64'] as unknown) = {
          signature: readFileSync(sigFile.path).toString(),
          url: downloadUrl,
        };
      }
    }
    if (updaterJsonKeepUniversal || os !== 'darwin' || arch !== 'universal') {
      (versionContent.platforms[`${os}-${arch}`] as unknown) = {
        signature: readFileSync(sigFile.path).toString(),
        url: downloadUrl,
      };
    }

    writeFileSync(versionFile, JSON.stringify(versionContent, null, 2));

    if (asset) {
      // https://docs.github.com/en/rest/releases/assets#update-a-release-asset
      await github.rest.repos.deleteReleaseAsset({
        owner: owner,
        repo: repo,
        release_id: releaseId,
        asset_id: asset.id,
      });
    }

    console.log(`Uploading ${versionFile}...`);
    await uploadAssets(owner, repo, releaseId, [
      { path: versionFile, arch: '' },
    ]);
  } else {
    const missing = downloadUrl
      ? 'Signature'
      : sigFile
      ? 'Asset'
      : 'Asset and signature';
    console.warn(
      `${missing} not found for the updater JSON. Skipping upload...`
    );
  }
}
