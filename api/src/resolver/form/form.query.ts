import { Injectable } from '@nestjs/common'
import { Args, Context, ID, Query } from '@nestjs/graphql'
import { User } from '../../decorator/user.decorator'
import { FormModel } from '../../dto/form/form.model'
import { FormEntity } from '../../entity/form.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormByIdPipe } from '../../pipe/form/form.by.id.pipe'
import { FormService } from '../../service/form/form.service'
import { IdService } from '../../service/id.service'
import { ContextCache } from '../context.cache'

@Injectable()
export class FormQuery {
  constructor(
    private readonly formService: FormService,
    private readonly idService: IdService,
  ) {
  }

  @Query(() => FormModel)
  getFormById(
    @User() user: UserEntity,
    @Args('id', {type: () => ID}, FormByIdPipe) form: FormEntity,
    @Context('cache') cache: ContextCache,
  ): FormModel {
    if (!form.isLive && !this.formService.isAdmin(form, user)) {
      throw new Error('invalid form')
    }

    cache.add(cache.getCacheKey(FormEntity.name, form.id), form)

    return new FormModel(this.idService.encode(form.id), form)
  }
}
