import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const { id } = req.query;

  // if ( !mongoose.isValidObjectId( id ) ) {
  //     return res.status(400).json({ message: 'El id no es válido ' + id })
  // }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    case "GET":
      return getEntry(req, res);

    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res
        .status(400)
        .json({ message: "Método no existe " + req.method });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  const entryInDB = await Entry.findById(id);
  await db.disconnect();

  if (!entryInDB) {
    return res
      .status(400)
      .json({ message: "No hay entrada con ese ID: " + id });
  }

  return res.status(200).json(entryInDB);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  console.log(req.query)

  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "No hay entrada con ese ID: " + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
    modifyTo = Date.now(),
    duration = entryToUpdate.duration,
    image = entryToUpdate.image
  } = req.body;

  console.log(req.body)

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status , modifyTo , duration , image},
      { runValidators: true, new: true }
    );
    console.log(updatedEntry)
    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
  // entryToUpdate.description = description;
  // entryToUpdate.status = status;
  // await entryToUpdate.save();
};
//DeleteEntry
const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();
  const entryToDelete = await Entry.findById(id);
  if (!entryToDelete) {
    await db.disconnect();
    return res.status(400).send({ message: "No hay entrada con esa ID" + id });
  }
  try {
    const entryToDelete = await Entry.findByIdAndDelete(id);
    res.status(200).json(entryToDelete!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
