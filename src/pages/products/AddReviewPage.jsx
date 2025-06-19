import useAddReview from "../../hooks/useAddReview";
import ReviewForm from "../../components/review/ReviewForm";

function AddReviewPage({ productId, token, onReviewAdded }) {
    const {
        rating,
        comment,
        success,
        error,
        handleChange,
        handleSubmit,
    } = useAddReview(productId, token, onReviewAdded);

    return (
        <ReviewForm
            rating={rating}
            comment={comment}
            onChange={handleChange}
            onSubmit={handleSubmit}
            success={success}
            error={error}
        />
    );
}

export default AddReviewPage;
