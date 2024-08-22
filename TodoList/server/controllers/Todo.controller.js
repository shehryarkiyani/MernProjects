import todo from "../models/Todo.js";

export const AddTodo = async (req, res) => {
  try {
    const newTodo = await todo.create(req.body);
    await newTodo.save();
    return res.status(200).json(newTodo);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export const ToogleTodoAvailability = async (req, res) => {
  try {
    const refTodo = await todo.findById(req.params.id);
    if (refTodo) {
      const updatedtodo = await todo.findOneAndUpdate(
        { _id: req.params.id },
        { available: !refTodo.available }
      );
      await updatedtodo.save();
      return res.status(200).json(updatedtodo);
    } else {
      return res.status(400).json({ message: "Todo Not Found" });
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export const UpdateTodo = async (req, res) => {
  try {
    await todo.findOneAndUpdate({ _id: req.params.id }, req.body);

    const updatedtodo = await todo.findById(req.params.id);

    return res.status(200).json(updatedtodo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const GetAllTodos = async (req, res) => {
  try {
    const todos = await todo.find({}).sort({ createdAt: -1 });

    return res.status(200).json({ data: todos });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const GetTodoById = async (req, res) => {
  try {
    const todos = await todo.findById(req.params.id);

    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const DeleteTodo = async (req, res) => {
  try {
    const deletedtodo = await todo.findByIdAndDelete(req.params.id);

    return res.status(200).json(deletedtodo);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
