package vo;

import java.sql.Date;

public class Reserve {
	private String seatcode;
	private int moviecode;
	private String memberid;
	private Date reservedate;
	public Reserve() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Reserve(String seatcode, int moviecode, String memberid, Date reservedate) {
		super();
		this.seatcode = seatcode;
		this.moviecode = moviecode;
		this.memberid = memberid;
		this.reservedate = reservedate;
	}
	
	public Reserve(String seatcode, int moviecode, String memberid) {
		super();
		this.seatcode = seatcode;
		this.moviecode = moviecode;
		this.memberid = memberid;
	}
	public String getSeatcode() {
		return seatcode;
	}
	public void setSeatcode(String seatcode) {
		this.seatcode = seatcode;
	}
	public int getMoviecode() {
		return moviecode;
	}
	public void setMoviecode(int moviecode) {
		this.moviecode = moviecode;
	}
	public String getMemberid() {
		return memberid;
	}
	public void setMemberid(String memberid) {
		this.memberid = memberid;
	}
	public Date getReservedate() {
		return reservedate;
	}
	public void setReservedate(Date reservedate) {
		this.reservedate = reservedate;
	}
	@Override
	public String toString() {
		return "예매정보 [ id : "+ memberid + " 예매날짜 : "+reservedate+" 좌석번호 : " +seatcode+ "]";
	}
}