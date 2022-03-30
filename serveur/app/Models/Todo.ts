import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public text: string

  @column()
  public type: string

  @column()
  public created: string

  @column()
  public edited: string | null

  @column()
  public position: number
}
