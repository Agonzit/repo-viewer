export class Repo {
    public name?: string;
    public author?: string;
    public description?: string;
    public link?: string;
    public userlink?: string;
    public creationdate?: string;
    public updatedat?: string;
    public avatar?: string;

    constructor(repo: any) {
        this.name = repo.name || '';
        this.author = repo.author || '';
        this.description = repo.description || '';
        this.link = repo.link || '';
        this.userlink = repo.userlink || '';
        this.creationdate = repo.creationdate || '';
        this.avatar = repo.avatar || '';
        this.updatedat = repo.updatedat || '';
    }
}
