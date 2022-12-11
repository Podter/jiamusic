pkgname=jiamusic
pkgver=0.1
pkgrel=1
arch=(i686 x86_64)
pkgdesc="A simple music player for KDE aiming to provide a nice experience for its users"
url="https://community.kde.org/Elisa"
license=(LGPL3)
depends=(kirigami2 kdeclarative baloo)
makedepends=(git python extra-cmake-modules kdoctools)
provides=(elisa)
conflicts=(elisa)
source=("elisa-22.12.0.tar.xz::https://download.kde.org/stable/release-service/22.12.0/src/elisa-22.12.0.tar.xz" "desktop.patch" "music.png")
sha512sums=('SKIP' 'SKIP' 'SKIP')

prepare() {
  mkdir -p build
}

build() {
  cd build
  cmake ../elisa-22.12.0 \
    -DCMAKE_INSTALL_PREFIX=/usr \
    -DCMAKE_INSTALL_LIBDIR=lib \
    -DBUILD_TESTING=OFF
  make
}

package(){
  cd build
  make DESTDIR="$pkgdir" install

  patch $pkgdir/usr/share/applications/org.kde.elisa.desktop desktop.patch
  mkdir -p $pkgdir/usr/share/icons/cvm-ui-icons
  cp $srcdir/music.png $pkgdir/usr/share/icons/cvm-ui-icons
}
