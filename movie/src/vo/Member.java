package vo;

public class Member {
	private String memberid;
	private String password;
	private String name;
	private String email;
	
	public Member() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Member(String memberid, String password, String name, String email) {
		super();
		this.memberid = memberid;
		this.password = password;
		this.name = name;
		this.email = email;
	}

	public String getMemberid() {
		return memberid;
	}
	public void setMemberid(String memberid) {
		this.memberid = memberid;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "Memeber [memberid=" + memberid + ", password=" + password + ", name=" + name + ", email=" + email + "]";
	}
	
}
