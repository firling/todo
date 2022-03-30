// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
    public async index() {
        return await Todo.all()
    }

    public async add({ request }) {
        const data = request.body()
        const todo = await Todo.create({
            text: data.text,
            type: 'todo',
            created: `${Date.now()}`,
            edited: `${Date.now()}`
        })

        return {success: true, todo}
    }

    public async remove({ request }) {
        const data = request.body()
        const todo = await Todo.findOrFail(data.id)
        await todo.delete()
        return {success: true}
    }
}
