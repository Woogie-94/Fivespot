import { Avatar, Button } from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useUserInfo } from "../hooks/useUserInfo";
import { CommentType } from "../types";

const Comment = ({ slug }: { slug: string }): JSX.Element => {
  const [commentData, setCommentData] = useState<CommentType[]>([]);
  const [body, onBody, setBody] = useInput<string>("");
  const [userInfo] = useUserInfo();

  const getComments = useCallback(async (): Promise<void> => {
    const response = await axios.get(`https://test.fivespot.space/api/articles/${slug}/comments`);
    setCommentData(response.data.comments);
  }, [slug]);

  const postComments = useCallback(async (): Promise<void> => {
    await axios.post(
      `https://test.fivespot.space/api/articles/${slug}/comments`,
      { comment: { body } },
      { headers: { Authorization: `Token ${userInfo.token}` } }
    );

    setBody("");
    getComments();
  }, [slug, userInfo, body, getComments, setBody]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <>
      <CommentInput placeholder="댓글을 작성하세요" value={body} onChange={onBody} />
      <CommentBtn>
        <Button size="small" variant="contained" color="primary" onClick={postComments}>
          댓글 작성
        </Button>
      </CommentBtn>
      {commentData.reverse().map((comment, index) => {
        return (
          <CommentItem key={index}>
            <CommentItemLeft>
              <Avatar />
            </CommentItemLeft>
            <CommentItemRight>
              <CommentAuthor>{comment.author.username}</CommentAuthor>
              <CommentBody>{comment.body}</CommentBody>
            </CommentItemRight>
          </CommentItem>
        );
      })}
    </>
  );
};

const CommentInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 0 10px;
`;

const CommentBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
`;

const CommentItem = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
`;

const CommentItemLeft = styled.div`
  margin-right: 15px;
`;
const CommentItemRight = styled.div``;

const CommentAuthor = styled.p`
  margin-bottom: 5px;
`;

const CommentBody = styled.p`
  font-family: "NanumSquareR";
`;

export default Comment;
