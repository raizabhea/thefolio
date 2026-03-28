// frontend/src/components/PostCard.js
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      {post.image && (
        <img
          src={`/uploads/${post.image}`}
          alt={post.title}
          className="post-image"
        />
      )}
      <h3>{post.title}</h3>
      <p>{post.body?.substring(0, 150)}...</p>
      <p className="post-meta">
        By {post.author?.name || 'Unknown'} on{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <Link to={`/posts/${post._id}`} className="btn">
        Read More
      </Link>
    </div>
  );
};

export default PostCard;