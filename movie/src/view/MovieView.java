package view;

import java.util.List;

import vo.Movie;

public class MovieView {
	
	
	public static void movieAdminList(List<Movie> movieList) {
		int i = 1;
		System.out.println("==========상영리스트===========");
		for(Movie m : movieList ) {
			System.out.print(i++ + ".");
			System.out.println(m);
		}
	}
	
	public static void movieList(List<Movie> movieList) {
		int i = 1;
		System.out.println("==========영화를 선택하세요===========");
		for(Movie m : movieList ) {
			System.out.print(i++ + ".");
			System.out.println(m);
		}
	
	}
}
