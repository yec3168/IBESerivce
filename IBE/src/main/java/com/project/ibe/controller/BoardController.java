package com.project.ibe.controller;

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
}
