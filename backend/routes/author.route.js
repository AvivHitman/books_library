import express from 'express';
import { Author } from "../config.js"

const router = express.Router();

router.get("/", async (req, res) => {
    const snapshot = await Author.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
});

router.post("/", async (req, res) => {
    const data = req.body;
    const docRef = await Author.add(data);
    res.send({ ...data, id: docRef.id });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    await Author.doc(id).update(data);
    res.send(data);
});

export default router;