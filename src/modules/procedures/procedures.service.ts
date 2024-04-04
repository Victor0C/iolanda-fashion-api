import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { ResponseProcedure } from './dto/response-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { ProcedureEntity } from './entities/procedure.entity';

@Injectable()
export class ProceduresService {
  constructor(@InjectRepository(ProcedureEntity) private readonly procedureRepository: Repository<ProcedureEntity>) { }

  public async findProcedureAllData(id: string): Promise<ProcedureEntity> {
    const procedure = await this.procedureRepository.findOneBy({ id })

    if (!procedure) throw new NotFoundException(`Procedure not found (id: ${id})`)

    return procedure
  }

  public async findProcedure(id: string): Promise<ResponseProcedure> {
    const procedure = await this.procedureRepository.findOneBy({ id })

    if (!procedure) throw new NotFoundException('Procedure not found')

    return new ResponseProcedure(procedure)
  }

  public async findAllProcedures(): Promise<ResponseProcedure[]> {
    const dataProcedures = await this.procedureRepository.find()

    const procedures = dataProcedures.map(procedure => new ResponseProcedure(procedure))

    return procedures
  }

  public async createProcedure(createProcedureDto: CreateProcedureDto): Promise<ResponseProcedure> {
    const procedureEntity = new ProcedureEntity()
    
    Object.assign(procedureEntity, createProcedureDto as ProcedureEntity)
    procedureEntity.price = createProcedureDto.price * 100

    const newProcedure = await this.procedureRepository.save(procedureEntity)

    return new ResponseProcedure(newProcedure)
  }

  public async updateProcedure(id: string, updateProcedureDto: UpdateProcedureDto): Promise<ResponseProcedure> {
    const procedure = await this.findProcedure(id)

    updateProcedureDto.price = updateProcedureDto.price * 100
    Object.assign(procedure, updateProcedureDto as ProcedureEntity)
    
    const updatedProcedure = await this.procedureRepository.save(procedure)

    return new ResponseProcedure(updatedProcedure)
  }

  public async deleteProcedure(id: string): Promise<void> {

    await this.findProcedure(id)
    await this.procedureRepository.delete(id)
  }
}
