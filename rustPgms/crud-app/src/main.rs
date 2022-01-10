#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;

use rocket_contrib::json::Json;
use rocket_contrib::json::JsonValue;

mod avatar;
use avatar::Avatar;

//READ operation
#[get("/")]
fn read() -> Json<JsonValue> {
    Json(json!(["Neha", "Megha"]))
}

//CREATE operation
#[post("/", data = "<avatar>")]
fn create(avatar: Json<Avatar>) -> Json<Avatar> {
    avatar
}

// //UPDATE operation
// #[put("/<id>", data = "<avatar>")]
// fn update(id: i32, hero: Json<Avatar>) -> Json<Avatar> {
//     avatar
// }

// //DELETE operation
// #[delete("/<id>")]
// fn delete(id: i32) -> Json<JsonValue> {
//     Json(json!({"status": "ok"}))
// }

fn main() {
    rocket::ignite()
        .mount("/avatar", routes![create])
        .mount("/avatars", routes![read])
        .launch();
}
