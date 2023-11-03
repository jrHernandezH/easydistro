import app from "./app.js";
import { PORT } from "./config.js";

//Aqui se encuentra el ´puerto por el cual escuchara las peticiones nodejs
app.listen(PORT);
//mensaje por consola para que se muestre que esta escuchando y funcionando el puerto
console.log('Server running on port', PORT);