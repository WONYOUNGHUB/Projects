package controller;

import java.util.Scanner;

import model.MovieService;
import view.MemberView;
import view.MovieView;
import vo.Movie;

public class MovieController {
	static MovieView movieview = new MovieView();
	static MemberController ref = new MemberController();
	static MovieService service = new MovieService();
	static Scanner sc = new Scanner(System.in);
	static boolean flag = true;
	static MemberView view = new MemberView();
	static int selectNo = 0;
	
	
	public static int adminMenu() {
	
		while(true) {
			
		System.out.println("---------운영자메뉴------------");
		System.out.println("1.영화추가");
		System.out.println("2.영화삭제");
		System.out.println("3.상영리스트");
		System.out.println("4.로그아웃");
		System.out.println(">>>>>");
			selectNo = sc.nextInt();
			
			while(true) {
				
			if (selectNo == 1) {
				insertMovie();
				System.out.println("영화가 추가되었습니다.");
				break;
			} if(selectNo ==2){
				deleteMovie();
				break;
			} if(selectNo==3) {
				movieview.movieAdminList(service.selectAllMovie());
				break;
			}else if(selectNo==4){
				System.out.println("로그아웃되었습니다.");
				return 0;
			}
			return 0;
		
			}
		}
	}
	

	private static void ListMovie() {
		service.selectAllMovie();
	}


	public static void insertMovie() {
		System.out.println("영화코드:");
		int code = sc.nextInt();
		System.out.println("영화감독:");
		String director = sc.next();
		System.out.println("영화제목:");
		String title = sc.next();
		Movie movie = new Movie(code, director, title);
		service.insertMovie(movie);
	}

	public static void deleteMovie() {
		System.out.print("영화코드>> ");
		int code = sc.nextInt();
		if(service.isReserveExist(code) != null) {
			System.out.println();
			System.out.print(" 삭제하시겠습니까?(yes/no)>> ");
			String yes = sc.next();
			if(yes.equals("yes")) {
				service.reserveDelete(code);
				int result = service.deleteMovie(code);
				System.out.println("영화가 삭제되었습니다.");
			}
		}else {
			int result = service.deleteMovie(code);
			System.out.println("영화가 삭제되었습니다.");
		}
	}



}
