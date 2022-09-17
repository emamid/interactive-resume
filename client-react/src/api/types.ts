// Non-exported interface, extended with associations and exported later
interface BaseEmployer {
	id: string;
	name: string;
	position: string;
	pageContent: string;
	url: string;
	startDate: string;
	endDate: string;
	longitude: number;
	latitude: number;	
}

interface BaseProject {
	id: string;
	name: string;
	pageContent: string;
	startDate: string;
	endDate: string;
	employerID: string;
	isPersonal: boolean;
}

export interface BaseTag {
	id: string;
	name: string;
	category: string;
	layer: string;
}

// Directly-exported interfaces
export interface Image {
	filename: string;
	caption: string;
	description: string;
	projectID: string;
	sortOrder: number;
}

export interface Myself {
	id: string;
	name: string;
	pageContent: string;
	personalEmployerID: string;
	Projects: BaseProject[];
}

export interface ProjectTag {
	projectCount: number;
	tagID: string;
	Tag: BaseTag;
}

export interface Reference {
	id: string;
	name: string;
	url: string;
}

// Interfaces with added associations
export interface Employer extends BaseEmployer {
	Projects: BaseProject[];
	References: Reference[];
}

export interface Project extends BaseProject {
	Employer: BaseEmployer;
	Images: Image[];
	Tags: BaseTag[];
}

export interface Tag extends BaseTag {
	Projects: BaseProject[];
}

// List types
export type Employers = BaseEmployer[];

export type Projects = Project[];

export type ProjectTags = ProjectTag[];

export type Tags = BaseTag[];
