  import {
    Model,
    ProjectionType,
    QueryFilter,
    QueryOptions,
    UpdateQuery,
  } from 'mongoose';

  export class AbstractRepository<T> {
    constructor(private readonly model: Model<T>) {}

    public async create(item: Partial<T>) {
      const doc = new this.model(item);
      return doc.save();
    }

    public async getOne(
      filter: QueryFilter<T>,
      projection?: ProjectionType<T>,
      options?: QueryOptions<T>,
    ) {
      return this.model.findOne(filter, projection, options);
    }

    public async updateOne(
      filter: QueryFilter<T>,
      updateQuery?: UpdateQuery<T>,
      options?: QueryOptions<T>,
    ) {
      return this.model.findOneAndUpdate(filter, updateQuery, options);
    }

    public async findOneAndUpdate(
      filter: QueryFilter<T>,
      updateQuery: UpdateQuery<T>,
      options: QueryOptions<T> = {},
    ) {
      return this.model.findOneAndUpdate(filter, updateQuery, {
        new: true,          // return updated document
        runValidators: true,
        ...options,
      });
    }
  public async getAll(
      filter: QueryFilter<T> = {},
      projection?: ProjectionType<T>,
      options?: QueryOptions<T>,
    ) {
      return this.model.find(filter, projection, options);
    }
  }