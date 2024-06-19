"use client";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import useCallAPIState from "@/hooks/UseCallAPIState";
import QuesService from "@/services/QuesService";
import { CommentData } from "@/types/Comment";
import Comment from "@/components/comentBox";
import { User } from "@/types/User";
import UserService from "@/services/UserService";
import UserComponent from "@/components/UserIcon";
import CommentServce from "@/services/CommentService";
import RenderState from '@/components/ConditionRender/RenderState';
import Breadcrumbs from "@/components/BreadCrum/AutoMapBreadCrum";
import {
    Modal,
    Button,
    Text,
    ActionIcon,
    Input,
    Password,
    Checkbox,
} from "rizzui";

import { BsSendArrowDownFill } from "react-icons/bs";
import { Question } from "@/types/Ques";
import { useParams } from "react-router-dom";

const PostPage: FC = () => {
    const { id } = useParams<{ id: string }>();

    const [apiState, updateApiState] = useCallAPIState<CommentData>({
        data: [],
        status: "IDLE"
    });
    const [postState, updatePostState] = useCallAPIState<Question>({
        data: {
            _id: '',
            title: "",
            body: "",
            votes: 1,
            createdAt: new Date,
            user: {
                fullName: "",
                avatar: ""
            }
        },
        status: "IDLE"
    });
    const [parentId, setParentId] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState<string>("");
    const [newContent, setNewContent] = useState<string>("");
    const [deleteCommentState, setDeleteDecisionState] = useState(false);
    const [deleteCommentId, setDeletedCommentId] = useState("");
    const handleParentId = (parentId: string) => {
        setParentId(parentId);
    };

    const ReplieAComment = async () => {

        await CommentServce.createAComment({ parentId: parentId, questionId: postState.data?._id, content: replyContent });
        OnUpdateComment()
    };
    const CreateAComment = async () => {

        await CommentServce.createAComment({ parentId: null, questionId: postState.data?._id, content: newContent });
        OnUpdateComment()
    };
    const SetDeleteAComment = async (commentId: string) => {
        setDeletedCommentId(commentId);
        setDeleteDecisionState(true);

    };
    const DeleteAComment = async () => {
        setDeleteDecisionState(false);
        await CommentServce.deleteMyComment(deleteCommentId);

        OnUpdateComment()
    };

    const handleChangeMessage = async (content: string) => {
        await setReplyContent(content);
    };
    const OnUpdateComment = async () => {
        try {
            updateApiState("IDLE", []);
            const comments = await CommentServce.getALLCommentforthisQuestions(id??"");
            updateApiState("SUCCESS", comments.data||[]);
        } catch (error) {
            console.error("Error fetching comments:", error);
            updateApiState("ERROR", []);
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                updateApiState("IDLE", []);
                const comments = await CommentServce.getALLCommentforthisQuestions(id ?? "");

                updateApiState("SUCCESS", comments.data || []);


                const post = await QuesService.getAQuestion(id ?? "");
                console.log(comments);
                updatePostState("SUCCESS", post.data || []);


            } catch (error) {
                console.error("Error fetching data:", error);
                updateApiState("ERROR", []);

                ;
            }
        };

        fetchData();
    }, [updateApiState, updatePostState]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && newContent !== "") {
                setNewContent("")
                CreateAComment();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [CreateAComment]);

    return (
        <>
            <div className="flex bg-white py-3 px-12 ">   <Breadcrumbs url={`rest-api/posts/${id}`} /></div>

            <div className="flex flex-row p-2 w-full select-none min-h-99 max-h-100">

                <div className="flex w-2/5 flex-col items-stretch h-50 max-h-96">
                    <Modal className="select-none fixed top-0 left-0 w-full h-full flex justify-center items-center" isOpen={deleteCommentState} onClose={() => setDeleteDecisionState(false)}>
                        <div className="m-auto bg-white w-80 h-52 border-2 rounded-2xl">
                            <div className="mb-7 flex flex-col  justify-start h-full rounded-2xl ">
                                <div className="w-full border-b border-gray text-center font-semibold h-4/5 p-4 rounded-t-2xl flex flex-col justify-center items-center">Delete Comment !!
                                    <p className="text-sm font-extralight">are you sure you want to delete this comment from this post!</p>
                                </div>

                                <div className="flex justify-evenly w-full">
                                    <ActionIcon
                                        size="sm"
                                        variant="text"
                                        className="absolete top-0 right-0 hover:scale-110"
                                        onClick={() => setDeleteDecisionState(false)}
                                    >
                                        Cancel
                                    </ActionIcon>

                                    <Button

                                        size="lg"
                                        className="col-span-2 mt-2 hover:text-red-600 border-hidden"
                                        onClick={DeleteAComment}
                                    >
                                        Delete
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </Modal>
                    <RenderState
                        loading={postState.loading}
                        success={postState.success}
                        error={postState.error}
                    >
                        {postState.success && (
                            <div className="p-6 h-4/5">
                                {postState.data.title}
                            </div>
                        )}
                    </RenderState>

                </div>


                <div className="flex w-3/5 max-h-99 bg-white overflow-y-scroll p-3 rounded-lg">
                    <RenderState
                        loading={apiState.loading}
                        success={apiState.success}
                        error={apiState.error}
                    >
                        {apiState.success && (
                            <div>
                                {apiState.data.map((comment) => (
                                    <Comment
                                        key={comment.id}
                                        comment={comment}
                                        postid={postState.data._id}
                                        OnUpdateComment={OnUpdateComment}
                                        setParentID={handleParentId}
                                        handleChangeMess={handleChangeMessage}
                                        CreateAComment={ReplieAComment}
                                        DeleteAComment={SetDeleteAComment}
                                    />
                                ))}
                            </div>
                        )}
                    </RenderState>

                </div>  <div className="fixed bottom-0 right-0 h-12 w-3/5 bg-white rounded-md ">
                    <div className="flex w-full  justify-center items-center">
                        <div className="w-full">

                            <input
                                id="comment"
                                autoComplete="off"
                                name="comment"
                                className="w-full h-full outline-none px-2"
                                value={newContent}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setNewContent(e.target.value) }}
                            />
                        </div>
                        <button id="sent-btn" className="p-2 h-full flex items-center justify-end" onClick={CreateAComment} type="submit"><BsSendArrowDownFill className="text-xl h-full text-center hover:text-cyan-400" /></button>
                    </div>
                </div>
            </div>
        </>


    );
};

export default PostPage;

