package com.project.ibe.services.board;

import com.project.ibe.dto.board.BoardFormRequest;
import com.project.ibe.dto.board.BoardFormResponse;
import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.entity.board.Board;
import com.project.ibe.entity.member.Member;
import com.project.ibe.repository.board.BoardCommentRepository;
import com.project.ibe.repository.board.BoardReplyRepository;
import com.project.ibe.repository.board.BoardRepository;
import com.project.ibe.services.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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

        Board savedBoard = boardRepository.save(board);

        return modelMapper.map(savedBoard, BoardFormResponse.class);
    }
}
