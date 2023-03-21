package com.kosta.project.member.model.service;

import com.kosta.project.member.model.dao.MemberDAO;
import com.kosta.project.member.vo.Member;

public class MemberService {
	MemberDAO memberDAO = new MemberDAO();
	
	public Member selectOneMember(String userId) {
		return memberDAO.selectOneMember(userId);
		}


	public int insertMember(Member member) {
		return memberDAO.insertMember(member);
	}


	public Member selectByNick(String nickName) {
		return memberDAO.selectByNick(nickName);
	}
	
	public int updateMember(Member member) {
		return memberDAO.updateMember(member);
	}

	public int delete(String userId) {
		return memberDAO.delete(userId);
	}


	public int updatePassword(Member loginMember) {
		return memberDAO.updatePassword(loginMember);
	}


	public Member memberCall(String memberId) {
		
		return  memberDAO.selectMember(memberId);
	}


	public int insertPassword(Member m) {
		return memberDAO.insertPassword(m);
	}
}

