import { FaRegCommentDots } from "react-icons/fa6";
import {Form, FloatingLabel } from "react-bootstrap";
import "./Comment.css"


const CommentCommponent = () => {
    const onSubmitHandler = () => {

    }
    return (
        <>
            <div id="comment">
                <div id="comment_info">
                    <div className="mx-5">
                        <span className="comment_top mx-5"><FaRegCommentDots /></span>
                        <span className="comment_top mx-3">댓글</span>
                        <span className="comment_top">10</span>
                    </div>
                </div>
                
                {/* 댓글 입력 form */}
                <div id="comment_inputs">
                    <Form className=" bg-white rounded"  onSubmit={onSubmitHandler}>
                        <FloatingLabel controlId="floatingTextarea2" label="댓글을 남겨주세요.">
                            <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '200px' }}
                            />
                        </FloatingLabel>
                    </Form>
                </div>

                {/* 댓글 목록 */}
                <div id="comment_list">
                    
                </div>



            </div>
           
        </>
    );
}

export default CommentCommponent;