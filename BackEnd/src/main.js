import { app } from "./config/app.js";
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Start at port ${port}`));
