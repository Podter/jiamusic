#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tauri_plugin_autostart::MacosLauncher;

#[cfg(not(target_os = "linux"))]
use window_shadows::set_shadow;

#[derive(Clone, serde::Serialize)]
struct Payload {
    args: Vec<String>,
    cwd: String,
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, argv, cwd| {
            app.emit_all("single-instance", Payload { args: argv, cwd })
                .unwrap();
        }))
        .plugin(tauri_plugin_autostart::init(
            MacosLauncher::LaunchAgent,
            Some(vec![]),
        ))
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            #[cfg(not(target_os = "linux"))]
            set_shadow(&window, true).expect("Unsupported platform!");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
