/*
import { Model, Table, Column, BelongsTo, HasMany } from 'sequelize-typescript';


@Table
class User extends Model {
  // ... campos e métodos do modelo
  @HasMany(() => Post)
  declare posts: Post[];
}

@Table
class Post extends Model {
  // ... campos e métodos do modelo
  @BelongsTo(() => User)
  declare user: User | undefined;

  @HasMany(() => Comment)
  declare comments: Comment[];
}
export default Post;

@Table
class Comment extends Model {
  // ... campos e métodos do modelo
  @BelongsTo(() => Post)
  declare post: Post;
}

const userId = 1;
const user = User.findOne({
    where: { id: userId },
    include: [
      {
        model: Post,
        include: [
          {
            model: Comment,
          },
        ],
      },
    ],
  });
  
  if (user) {
    for (const post of user.posts) {
      for (const comment of post.comments) {
        console.log(comment.text); // Acessando o texto do comment
      }
    }
  }

  export { User, Post, Comment};
*/