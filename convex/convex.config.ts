import { defineApp } from "convex/server";
import r2 from "@convex-dev/r2/convex.config.js";
import creem from "@mmailaender/convex-creem/convex.config";

const app = defineApp();
app.use(r2);
app.use(creem);

export default app;