import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Todos extends BaseSchema {
  protected tableName = 'todos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('text')
      table.string('type')
      table.string('created')
      table.string('edited')
      table.integer('position')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
