package controller;

import java.sql.Date;
import java.util.Scanner;

import model.MemberService;
import model.MovieService;
import model.ReserveService;
import model.SeatService;
import view.MemberView;
import view.MovieView;
import view.SeatView;
import vo.Member;
import vo.Movie;
import vo.Reserve;
import vo.Seat;

public class MemberController {
	static SeatView sview = new SeatView();
	static SeatService sservice = new SeatService();
	static MovieService mservice = new MovieService();
	static MovieController method = new MovieController();
	static MemberService service = new MemberService();
	static ReserveService rservice = new ReserveService();
	static Scanner sc = new Scanner(System.in);
	static boolean flag = true;
	static MemberView view = new MemberView();
	static int selectNo = 0;
	static ReserveController rt = new ReserveController();
	static Reserve reserve = new Reserve();
	static Member member = new Member();
	
	
	
	public static void main(String[] args) {
	 while(true) {
		selectNo = mainMenu();
		switch (selectNo) {
		case 1:
			loginMember();
			break;
		case 2:
			resisterMember();
			break;
		case 0:
			break;
		default:
			break;
		}
	 }
	}

	private static int mainMenu() {
		System.out.println("-------영화관에 오신것을 환영합니다--------");
		System.out.println("1.로그인");
		System.out.println("2.회원가입");
		System.out.println("선택>>>");
		return sc.nextInt();
	}

	private static int loginMember() {

		System.out.println("========로그인=========");
		System.out.println("id를입력하세요>>>");
		String memberid = sc.next();
		System.out.println("password를 입력하세요>>>");
		String password = sc.next();
		member = new Member(memberid, password, null, null);
		System.out.println(member);
		member = service.loginMember(member);

		if (member.getEmail() == null) {
			System.out.println("아이디 또는 비밀번호가 잘못되었습니다");
			return 0;

		} else {
			if (memberid.equals("admin")) {
				view.loginMemberView();
				return method.adminMenu();
			}
			view.loginMemberView();
			return userMenu();
		}

	}

	private static int userMenu() {
		boolean b_submenu = true;
		boolean b_isexit = false;

//		while(b_submenu) {
		while (b_isexit == false) {
			System.out.println("-------회원메뉴-----------");
			System.out.println("1.영화예매");
			System.out.println("2.예매확인");
			System.out.println("3.예매취소");
//			System.out.println("4.회원탈퇴");
			System.out.println("9.로그아웃");
			System.out.print(">>>>");

			int userMenuNo = sc.nextInt();
			int movieSelectNo;
			if (userMenuNo == 1) {
				while (true) {
					MovieView.movieList(mservice.selectAllMovie());
					System.out.print(">>>");
					movieSelectNo = sc.nextInt();

					if (movieSelectNo >= 1 && movieSelectNo <= 4)
						break;
				}
				 	while(true) {
				 		
					if (movieSelectNo != 0) {
						String s = "n";
						
						long miliseconds = System.currentTimeMillis();
						Date date = new Date(miliseconds);
						Movie movie = mservice.selectAllMovie().get(movieSelectNo - 1);
						int moviecode = movie.getMoviecode();
						System.out.println("moviecode:" + movie);
						
						SeatView.seatList(sservice.selectAll());
						
						System.out.print(">>>>");//

						String seatSelect = sc.next();
//						seatSelect.toUpperCase();
						
						char[] seatIndex = seatSelect.toCharArray();
						if (seatIndex.length == 2 && seatIndex[0] >='A' &&  seatIndex[0] <= 'D') {

							if (seatSelect != null && checkReserveYN(seatSelect).equals(s)) {
								// 예약함수
								ReserveController.insertReserve(seatSelect, moviecode, member.getMemberid(), date);
								ReserveController.updateYN(seatSelect);
								System.out.println("예매되었습니다.");
								break;
							}else {
								System.out.println("예약실패");
								break;
							}
							
						}else {
							System.out.println("입력오류 ");
						}
						
						}
						
					}//if
				 
				
			} if(userMenuNo == 2 ){
				while(true) {
				SelectAllbyId();
				break;
				}
			} if(userMenuNo ==3) {
				while(true) {
					DeleteMember();
					break;
				}
			}
			else if (userMenuNo == 9) {
				b_isexit = true;
			System.out.println("감사합니다.");	
			
		  }
		}
		return 0;
	}

//	private static int memberSplit(int putNo) {
//		Member rm = new Member();
//		if (putNo == 1) {
//			resisterMember();
//		} else {
//			DeleteMember(rm);
//		}
//
//		return sc.nextInt();
//	}
	
	public  static String checkReserveYN(String seatSelect) {
		String aa = sservice.checkReserveYN(seatSelect).getReserveyn();
		return aa;
		
	}
	
	private static void DeleteMember() {
		System.out.print("예매하신 아이디를 입력하세요>>> ");
		String memberid= sc.next();
		System.out.print("예매하신 좌석 입력하세요>>> ");
		String seatcode = sc.next();
		System.out.println(rservice.selectAllbyId(memberid));
		System.out.println("예매를 취소 하시겠습니까?(yes/no)");
		System.out.println(">>");
		String bool = sc.next();
		if(bool.equals("yes")) {
		rservice.delete(memberid);
		Seat seat = new Seat(seatcode, null, "n");
		service.updateYN(seat);
		
		System.out.println("예매가 취소되었습니다.");
		return;
		}else return;
	}
	private static void SelectAllbyId() {
		System.out.print("예매하신 아이디를 한번더 입력하세요>>");
		String memberid = sc.next();

		if((rservice.selectAllbyId(memberid)) != null) {
		System.out.println(rservice.selectAllbyId(memberid));
		}else {
			System.out.println("예매내역이없습니다.");
			
		}
		
	}
	private static void resisterMember() {
		System.out.print("id>> ");
		String id = sc.next();
		System.out.println("passowrd>> ");
		String password = sc.next();
		System.out.println("email>> ");
		String email = sc.next();
		System.out.println("name>> ");
		String name = sc.next();
		Member member = new Member(id, password, email, name);
		System.out.println("회원가입이 되었습니다");
		service.resisterMember(member);
		
	}
//	public static void dialog() {
//		JOptionPane.showMessageDialog(null, member);
//	}
//	String mainMenu = "-------영화관에오신것을 환영합니다----------"
//			+ "1.로그인\n"
//			+ "2.회원가입\n";
//	public static int choiceMember() {
//		System.out.println("1.회원가입");
//		System.out.println("2.회원탈퇴");
//		System.out.print("선택>>>");
//		
//		return sc.nextInt() ;
//	}

}
