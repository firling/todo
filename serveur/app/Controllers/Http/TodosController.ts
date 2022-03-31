import Database from '@ioc:Adonis/Lucid/Database'
import Todo from 'App/Models/Todo'

export default class TodosController {
    public async index() {
        return await Database.from('todos').orderBy('position', 'desc')
    }

    public async add({ request }) {
        const data = request.body()
        const todo = await Todo.create({
            text: data.text,
            type: 'todo',
            created: `${Date.now()}`,
            edited: `${Date.now()}`,
            position: (await Database.from('todos').max('position as pos'))[0]['pos'] + 1
        })

        return {success: true, todo}
    }

    public async remove({ request }) {
        const data = request.body()
        const todo = await Todo.findOrFail(data.id)
        await todo.delete()
        return {success: true}
    }

    public async changeColumn({ request }) {
        const data = request.body();
        const { id, col } = data;
        const todo = await Todo.findOrFail(id);
        todo.type = col;
        todo.save()
        return {success: true}
    }

    public async changePosition({ request }) {
        const data = request.body();
        const { ids } = data;
        Object.values(ids).map((id: any) => {
            id.items.reverse().forEach(async (elt: any, index: number) => {
                await Database
                    .from('todos')
                    .where('id', elt.id)
                    .update({ position: index })
            })
        })
        return {success: true}
    }
}
