import express from "express"
import cors from "cors"
import { fileURLToPath } from 'url';
import * as path from 'path';


const app = express();

app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "client")));
app.use(cors({ origin: true }));

const PORT=3001 || process.env.PORT;
const HOST="localhost" || process.env.HOST;

app.listen(PORT, () => console.log(`server runing on port ${PORT}`));
console.log(`server is running on http://${HOST}:${PORT}`)
