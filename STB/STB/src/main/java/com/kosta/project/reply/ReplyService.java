package com.kosta.project.reply;

import java.util.List;

public class ReplyService {
	
	ReplyDAO replyDAO = new ReplyDAO(); 
	
	public List<Reply> replyList(int boardId){
		List<Reply> list = replyDAO.getReplyList(boardId);
		return list;
	}
	
	public int create(Reply reply) {
		return replyDAO.writeReply(reply);
	}
	
	public int delete(int replyId, String userId) {
		return replyDAO.deleteReply(replyId, userId);
	}
	
}
