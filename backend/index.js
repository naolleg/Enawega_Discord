import express from "express"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const PORT=3001 || process.env.PORT;

app.listen(PORT, () => console.log(`server runing on port ${PORT}`));
