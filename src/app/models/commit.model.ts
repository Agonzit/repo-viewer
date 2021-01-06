export class Commit {
    public date?: string;
    public message?: string;
    public filesNumber?: number;
    public author?: string;
  
    constructor(commit: any) {
        this.date = commit.date || '';
        this.message = commit.message || '';
        this.filesNumber = commit.filesNumber || 0;
        this.author = commit.author || '';
    }
}