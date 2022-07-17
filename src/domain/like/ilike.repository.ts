export interface ILikeRepository {
  putLike(postId: number, userEmail: string): Promise<boolean>;
  disLike(postId: number, userEmail: string): Promise<boolean>;
  existLike(postId: number, userEmail: string): Promise<boolean>;
  countLikes(postId: number): Promise<number>;
}
