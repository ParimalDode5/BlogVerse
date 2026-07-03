import React from 'react'
import { Container } from '../components';
import ProfileHeader from '../components/profile/ProfileHeader';
import StatsCards from '../components/profile/StatsCards';
import MyPosts from '../components/profile/MyPosts';

function Profile() {

    return (
        <div className='py-8'>
            <Container>
                <h2 className='text-4xl font-bold mb-8 pb-4'>
                    My Profile
                </h2>


                <ProfileHeader />
                <StatsCards />
                <MyPosts />
            </Container>
        </div>
    )
}

export default Profile