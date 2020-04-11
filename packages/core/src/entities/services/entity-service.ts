import { pickBy, negate, merge } from 'lodash';
import { EntitySchema } from '../entity-schema';
import { Entity } from '../entity';
import { CoreContextModel } from '../../context/core-context';

class EntityService {
  instanceDisplayPropsOrDefault = (entitySchema: EntitySchema, context: CoreContextModel) => (entity: any) => {
    const defaultInstanceDisplayProps: {
      primaryText: string;
      secondaryText: string | undefined;
      imageUrl: string | undefined;
    } = {
      primaryText: entity._id,
      secondaryText: undefined,
      imageUrl: undefined,
    };
    let overrideInstanceDisplayProps;
    try {
      overrideInstanceDisplayProps = pickBy(
        entitySchema.options.instanceDisplayProps!(entity, { context }),
        negate((a) => !Boolean(a))
      );
    } catch (error) {}

    return merge(defaultInstanceDisplayProps, overrideInstanceDisplayProps) as {
      primaryText: string;
      secondaryText: string | undefined;
      imageUrl: string | undefined;
    };
  };
}

export const entityService = new EntityService();
