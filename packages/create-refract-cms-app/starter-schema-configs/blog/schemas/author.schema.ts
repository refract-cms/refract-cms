import { composeSchema, createTextEditor } from '@refract-cms/core';
import PersonIcon from '@material-ui/icons/Person';

export const AuthorSchema = composeSchema({
  options: {
    alias: 'author',
    displayName: 'Author',
    icon: PersonIcon,
    instanceDisplayProps: author => ({
      primaryText: `${author.lastName}, ${author.firstName}`
    })
  },
  properties: {
    firstName: {
      displayName: 'First name(s)',
      editorComponent: createTextEditor(),
      type: String
    },
    lastName: {
      displayName: 'Surname',
      editorComponent: createTextEditor(),
      type: String
    }
  }
});
