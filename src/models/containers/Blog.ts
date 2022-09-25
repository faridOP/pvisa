import BreadCrumbs from "../../containers/Blog/BreadCrumbs/BreadCrumbs";
import GroupedPosts from "../../containers/Blog/Posts/GroupedPosts/GroupedPosts";
import CategoryNavigation from "../../containers/Blog/Categories/CategoryNavigation/CategoryNavigation";
import CategoryNavigationLink from "../../containers/Blog/Categories/CategoryNavigationLink/CategoryNavigationLink";
import SinglePost from "../../containers/Blog/Posts/SinglePost/SinglePost";
import RecentPost from "../../containers/Blog/Posts/RecentPost/RecentPost";
import RecentPostsTable from "../../containers/Blog/Posts/RecentPostsTable/RecentPostsTable";
import RelatedPosts from "../../containers/Blog/Posts/RelatedPosts/RelatedPosts";
import Topics from "../../containers/Blog/Topics/Topics";
import { CategoryColors } from "../../static/CategoryColors";
import PostsByCategory from "../../containers/Blog/Posts/PostsByCategory/PostsByCategory";
import Container from "../../containers/Blog/Categories/SearchResult/Container/Container";
import Item from "../../containers/Blog/Categories/SearchResult/Item/Item";
import React, { AnchorHTMLAttributes } from "react";

type ListPostItem = {
  title?: Indefinable<string>;
  content?: Indefinable<string>;
  authorContent?: Indefinable<string>;
  dateContent?: Indefinable<Date | string>;
  imageUrl?: Indefinable<string>;
  positionNumber?: Indefinable<string>;
  href: string;
};

type TopicItem = {
  imageUrl?: Indefinable<string>;
  title?: Indefinable<string>;
  href?: string;
};

type RecentPostProps = {
  href?: string;
  title?: string;
  imageUrl?: string;
  author?: string;
  date?: string;
};

type PostProps = {
  category: {
    slug: Indefinable<string>;
    name: Indefinable<string>;
  };
  title: string;
  imageUrl: string;
  author: string;
  date: string;
  content: string;
  recentPosts: RecentPostProps[];
  routerProps: RouterProps;
};

type RelatedPost = {
  imageUrl?: string;
  categoryContent?: string;
  title?: string;
  href?: string;
};

type BreadCrumbProps = {
  categoryContent: {
    title: Indefinable<string>;
    href: Indefinable<string>;
  };
  postContent: {
    title: string;
  };
};

type SearchResultItem = {
  href: string;
  label: string;
};
type BlogComponent = {
  Topics: DivElement<{
    items: TopicItem[];
  }>;

  Categories: {
    CategoryNavigationLink: React.FC<
      React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }
    >;
    CategoryNavigation: DivElement<{
      items: (TopicItem & { isActive?: boolean })[];
    }>;
    SearchResult: {
      Container: DivElement<{
        items: Indefinable<SearchResultItem[]>;
      }>;
      Item: React.FC<
        AnchorHTMLAttributes<HTMLAnchorElement> & SearchResultItem
      >;
    };
  };
  Posts: {
    GroupedPosts: DivElement<{
      categoryTitle?: string;
      categoryTitleColor?: CategoryColors;
      categoryUrl?: string;
      posts: ListPostItem[];
    }>;
    RecentPost: DivElement<RecentPostProps>;
    RecentPostsTable: DivElement<{ items: RecentPostProps[] }>;
    RelatedPosts: DivElement<{ items: RelatedPost[] }>;
    SinglePost: DivElement<PostProps>;
    PostsByCategory: DivElement<{
      posts: ListPostItem[];
      categoryTitle?: string;
      categoryUrl?: string;
    }>;
  };
  BreadCrumbs: DivElement<BreadCrumbProps>;
};

export const Blog: BlogComponent = {
  Topics,
  Categories: {
    CategoryNavigationLink,
    CategoryNavigation,
    SearchResult: {
      Container,
      Item,
    },
  },
  Posts: {
    GroupedPosts,
    RecentPost,
    RecentPostsTable,
    RelatedPosts,
    SinglePost,
    PostsByCategory,
  },
  BreadCrumbs,
};
