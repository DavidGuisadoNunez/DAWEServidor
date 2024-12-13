function controladorRutaProtegida(req, res){
    res.send('Acceso Contenido');
};

function controladorRutaPublica(req, res){
res.send('Bienvenido a la ruta publica');
};

function controladorRutaVip(req, res){
    res.send('Bienvenido a la ruta vip');
};

function controladorRutaAdmin(req, res){
    res.send('Bienvenido a la ruta admin');
};
export {controladorRutaAdmin, controladorRutaProtegida, controladorRutaPublica, controladorRutaVip};