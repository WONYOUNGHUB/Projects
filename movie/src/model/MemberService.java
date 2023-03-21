package model;

import vo.Member;
import vo.Seat;

public class MemberService {
	static MemberDAO dao = new MemberDAO();
	
	public int updateYN(Seat seat) {
		return dao.updateYN(seat);
	}
	
	public int resisterMember(Member member) {
		return dao.resisterMember(member);
	}
	
	public Member loginMember(Member member ) {
		return dao.loginMember(member);
	}
}
