package com.project.ibe.controller;

import com.project.ibe.dto.board.BoardCommentRequest;
import com.project.ibe.dto.board.BoardFormRequest;
import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.entity.common.Response;
import com.project.ibe.entity.common.ResponseCode;
import com.project.ibe.services.board.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;

    /**
     * 게시글 등록.
     */
    @PostMapping
    public Response saveBoard(@RequestBody @Valid BoardFormRequest boardFormRequest, @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
//            System.out.println(boardFormRequest.getBoardCategory() + principalDTO.getMemberEmail() + boardFormRequest.getBoardTitle() + boardFormRequest.getBoardContent());
            return new Response(ResponseCode.SUCCESS, boardService.saveBoard(boardFormRequest, principalDTO), "200");

        }catch (Exception e){
//            System.out.println("fail");
            return  new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    /**
     * 게시글 상세조회.
     */
    @GetMapping("/{id}")
    public Response getBoardDetail(@PathVariable("id")Long boardId){
        try{
            return new Response(ResponseCode.SUCCESS, boardService.getBoardDetail(boardId), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }

    /**
     * 게시글 목록조회.
     */
    @GetMapping
    public Response getBoardList(){
        try{
            return new Response(ResponseCode.SUCCESS, boardService.getBoardList(), "200");
        }catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }
    }
    /**
     * 댓글 등록.
     */
    @PostMapping("/comments")
    public Response saveBoardComments(@RequestBody BoardCommentRequest boardCommentRequest,
                                      @AuthenticationPrincipal PrincipalDTO principalDTO){
        try{
            return new Response(ResponseCode.SUCCESS, boardService.saveBoardComment(boardCommentRequest, principalDTO), "200");
        } catch (Exception e){
            return new Response(ResponseCode.FAIL, e.getMessage(), "404");
        }

    }
}
