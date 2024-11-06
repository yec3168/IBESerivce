package com.project.ibe.services.board;

import com.project.ibe.dto.board.*;
import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.entity.board.Board;
import com.project.ibe.entity.board.BoardComment;
import com.project.ibe.entity.member.Member;
import com.project.ibe.exception.BusinessException;
import com.project.ibe.repository.board.BoardCommentRepository;
import com.project.ibe.repository.board.BoardReplyRepository;
import com.project.ibe.repository.board.BoardRepository;
import com.project.ibe.services.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardCommentRepository boardCommentRepository;
    private final BoardReplyRepository boardReplyRepository;
    private final MemberService memberService;

    private final ModelMapper modelMapper;

    /**
     * 게시판 등록.
     */
    public BoardFormResponse saveBoard(BoardFormRequest boardFormRequest, PrincipalDTO principalDTO){
        // 로그인한 회원 찾기.
        Member member = memberService.getMemberByEmail(principalDTO.getMemberEmail());

        Board board = modelMapper.map(boardFormRequest, Board.class);
        board.setMember(member); // 작성자.
        board.setBoardHit(0);

        Board savedBoard = boardRepository.save(board);

        return modelMapper.map(savedBoard, BoardFormResponse.class);
    }


    /**
     * 게시판 상세 정보
     */
    public boolean getBoardDetail(Long id){
        // 게시판 정보.
        Board board = findBoardById(id);

        // 상세정보 가져오기.
        return false;
    }

    /**
     *  게시글 목록 조회.
     */

//    public BoardListResponse getBoardList(){
//        List<Board>
//    }

    /**
     * 댓글 등록.
     */
    public BoardCommentResponse saveBoardComment(BoardCommentRequest boardCommentRequest, PrincipalDTO principalDTO){
        // 댓글 작성자.
        Member member = memberService.getMemberByEmail(principalDTO.getMemberEmail());

        // 게시글
        Board board = findBoardById(boardCommentRequest.getBoardId());


        // 등록.
        BoardComment boardComment = modelMapper.map(boardCommentRequest, BoardComment.class);
        boardComment.setMember(member);

        boardCommentRepository.save(boardComment);

        return modelMapper.map(boardComment, BoardCommentResponse.class);
    }
    
    
    private Board findBoardById(Long id){
        return boardRepository.findById(id)
                .orElseThrow(
                        () -> new BusinessException("게시글을 찾을 수 없습니다.", HttpStatus.NOT_FOUND)
                );
    }

    
}
