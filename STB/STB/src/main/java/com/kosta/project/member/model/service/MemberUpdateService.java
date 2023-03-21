package com.kosta.project.member.model.service;

import com.kosta.project.member.model.dao.MemberUpDateDAO;
import com.kosta.project.member.vo.Member;

public class MemberUpdateService {
	
	MemberUpDateDAO dao = new MemberUpDateDAO();
	
	
			
			
	public int updateMember(Member member) {
		return dao.updateMember(member);
	}
		
}
