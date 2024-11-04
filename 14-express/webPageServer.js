import express from "express";
const app = express();

const port = 3000;

const htmlContent = `
        <html>
            <head>
                <title>Página de Ejemplo</title>
            </head>
            <body>
                <h1>Hello World!</h1>
                <p>Bienvenido a mi servidor Node.js.</p>
            </body>
        </html>
    `;

app.get("/", (req, res) => {
  res.send(htmlContent);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
