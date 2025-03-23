import bcryptjs from "bcryptjs";

const hashPass = async (pass) => {
    const password = await bcryptjs.hash(pass, 10)
    console.log(`${pass} ----`, password)
}


// (async() => (await hashPass("Muskan2025")))()
// (async() => (await hashPass("Faculty2024")))()
(async() => (await hashPass("Media2024")))()