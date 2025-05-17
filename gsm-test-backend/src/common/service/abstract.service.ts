import { Repository } from 'typeorm';
import { AbstractEntity } from '../entity/abstract.entity';
import { AbstractDto } from '../dto/abstract.dto';

export abstract class AbstractService<D extends AbstractDto, E extends AbstractEntity> {

  constructor(private readonly repository: Repository<E>) {}

  async save(dto: D): Promise<D> {
    let entity = await this.toEntity(dto);
    entity = await this.repository.save(entity);
    const result = await this.toDto(entity);
    return result;
  }

  async remove(dto: D): Promise<void> {
    if (dto.id) {
    const result = await this.findById(dto.id);      
      if (result) {
        const entity = await this.toEntity(result);;
        await this.repository.remove(entity);
      }  
    }
  }      

  async removeById(id: number): Promise<void> {
    const result = await this.findById(id);      
    if (result) {
      const entity = await this.toEntity(result);;
      await this.repository.remove(entity);
    }    
  }  

  async findById(id: number): Promise<D | undefined> {        
    const entity = await this.repository.createQueryBuilder("obj").where("obj.id = :id", { id: id }).getOne();
    if (entity) {
      return await this.toDto(entity);
    }
    return undefined;
  }

  async findOne(dto: D): Promise<D | undefined> {    
    if (dto.id) {
      const result = await this.findById(dto.id);      
      if (result) {
        return result;
      }
    }  
    return undefined;
  }  

  async findAll(): Promise<D[]> {
    const result = new Array<D>();
    const list = await this.repository.find();
    for (const e of list) {
      const d = await this.toDto(e);
      result.push(d);
    }
    return result;
  }

  abstract toDto(enity: E) : Promise<D>;
  abstract toEntity(dto: D) : Promise<E>; 
  
}
