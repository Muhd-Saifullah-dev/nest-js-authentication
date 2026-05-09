import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma.service';
import { paginate, paginationMeta } from 'src/utils/pagination';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createNoteDto: CreateNoteDto, authorId: number) {
    const note = await this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        body: createNoteDto.body,
        authorId: authorId,
      },
    });
    return {
      message: 'note created',
      data: { note },
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const { skip, take } = paginate(page, limit);

    const [notes, total] = await Promise.all([
      this.prisma.note.findMany({
        skip,
        take,
      }),

      this.prisma.note.count(),
    ]);

    const meta = paginationMeta(total, page, limit);

    return {
      message: 'all notes fetched successfully',
      data: { notes, meta },
    };
  }

  async findOne(id: number) {
    const note = await this.prisma.note.findUnique({
      where: { id: id },
    });
    if (!note) {
      throw new BadRequestException('not note found with this id');
    }
    return {
      message: 'note fetched',
      data: { note },
    };
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.prisma.note.update({
      where: {
        id,
      },
      data: updateNoteDto,
    });
    return {
      message: 'note can update',
      data: { note },
    };
  }

  async remove(id: number) {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!note) {
      throw new BadRequestException('Note not found');
    }
    await this.prisma.note.delete({
      where: { id },
    });

    return {
      message: 'note deleted',
      data: {},
    };
  }
}
