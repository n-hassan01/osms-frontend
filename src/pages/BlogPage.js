import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
// components
// mock
import { getLoggedInUserDetails } from '../Services/ApiServices';
import { getBlogsDetailsService } from '../_mock/blog';
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSearch, BlogPostsSort } from '../sections/@dashboard/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const [blogPost, setBlogPost] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const blogDetails = await getBlogsDetailsService();
        setBlogPost(blogDetails);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);

  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const usersDetails = await getLoggedInUserDetails();
        if (usersDetails) setLoggedInUser(usersDetails.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);

  const displayAddUser = loggedInUser.role === 1 || loggedInUser.role === 2 ? 'flex' : 'none';

  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | CB </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
          <Button
            style={{ display: displayAddUser }}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={blogPost} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {blogPost.map((post, index) => (
            <BlogPostCard key={post.blogid} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
