import { Router } from "express";
import validateTokenMiddleware, { requireRole } from "../middleware/validateTokenMiddleware.js"; // Importamos el middleware `requireRole`
import {controladorRutaAdmin,controladorRutaProtegida,controladorRutaPublica, controladorRutaVip,} from "../controllers/index.js";

const indexRouter = Router();

indexRouter.get("/rutaProtegida", validateTokenMiddleware, controladorRutaProtegida);

indexRouter.get('/publica', controladorRutaPublica);

indexRouter.get('/vip', validateTokenMiddleware, requireRole('usuario'), controladorRutaVip);

indexRouter.get('/admin', validateTokenMiddleware, requireRole('admin'), controladorRutaAdmin);

export default indexRouter;
