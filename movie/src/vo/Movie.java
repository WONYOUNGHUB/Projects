package vo;

public class Movie {
	private int moviecode;
	private String director;
	private String title;

	public Movie(int moviecode, String director, String title) {
		super();
		this.moviecode = moviecode;
		this.director = director;
		this.title = title;
	}

	public Movie() {
	}

	public int getMoviecode() {
		return moviecode;
	}

	public void setMoviecode(int moviecode) {
		this.moviecode = moviecode;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return  title + "("+ director + " 감독)";
	}

	
	
}
